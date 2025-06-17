import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, collections, userRoles } from '../firebase';

// User Management
export const createUserProfile = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(db, collections.users, userId), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      score: 0,
      rank: 0,
      projects: 0,
      badges: 0,
      views: 0,
      likes: 0
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { success: false, error };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, collections.users, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    return { success: false, error };
  }
};

export const updateUserProfile = async (userId: string, updates: any) => {
  try {
    await updateDoc(doc(db, collections.users, userId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error };
  }
};

// Project Management
export const uploadProject = async (projectData: any, files: File[]) => {
  try {
    // Upload files to storage
    const uploadedFiles = [];
    for (const file of files) {
      const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      uploadedFiles.push({
        name: file.name,
        url: downloadURL,
        size: file.size,
        type: file.type
      });
    }

    // Save project to Firestore
    const projectDoc = await addDoc(collection(db, collections.projects), {
      ...projectData,
      files: uploadedFiles,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      views: 0,
      likes: 0,
      status: 'active'
    });

    // Update user stats
    await updateUserStats(projectData.userId, {
      projects: 1,
      score: 100 // Base score for uploading project
    });

    return { success: true, projectId: projectDoc.id };
  } catch (error) {
    console.error('Error uploading project:', error);
    return { success: false, error };
  }
};

export const getProjects = async (filters: any = {}) => {
  try {
    let q = collection(db, collections.projects);
    
    if (filters.userId) {
      q = query(q, where('userId', '==', filters.userId));
    }
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    
    q = query(q, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error getting projects:', error);
    return { success: false, error };
  }
};

// Problem Statement Management
export const createProblemStatement = async (problemData: any, files: File[] = []) => {
  try {
    // Upload files to storage
    const uploadedFiles = [];
    for (const file of files) {
      const storageRef = ref(storage, `problemStatements/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      uploadedFiles.push({
        name: file.name,
        url: downloadURL,
        size: file.size,
        type: file.type
      });
    }

    // Save problem statement to Firestore
    const problemDoc = await addDoc(collection(db, collections.problemStatements), {
      ...problemData,
      files: uploadedFiles,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      applications: 0,
      status: 'active',
      selectedSolution: null
    });

    return { success: true, problemId: problemDoc.id };
  } catch (error) {
    console.error('Error creating problem statement:', error);
    return { success: false, error };
  }
};

export const getProblemStatements = async (filters: any = {}) => {
  try {
    let q = collection(db, collections.problemStatements);
    
    if (filters.companyId) {
      q = query(q, where('companyId', '==', filters.companyId));
    }
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    
    q = query(q, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const problems = [];
    querySnapshot.forEach((doc) => {
      problems.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: problems };
  } catch (error) {
    console.error('Error getting problem statements:', error);
    return { success: false, error };
  }
};

// Leaderboard Management
export const getLeaderboard = async (category: string = 'all', limit: number = 50) => {
  try {
    let q = collection(db, collections.users);
    
    if (category !== 'all') {
      q = query(q, where('primaryCategory', '==', category));
    }
    
    q = query(q, orderBy('score', 'desc'), limit(limit));
    
    const querySnapshot = await getDocs(q);
    const leaderboard = [];
    let rank = 1;
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      leaderboard.push({
        id: doc.id,
        rank,
        ...userData
      });
      rank++;
    });
    
    return { success: true, data: leaderboard };
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return { success: false, error };
  }
};

// Real-time Leaderboard Updates
export const subscribeToLeaderboard = (category: string = 'all', callback: (data: any) => void) => {
  let q = collection(db, collections.users);
  
  if (category !== 'all') {
    q = query(q, where('primaryCategory', '==', category));
  }
  
  q = query(q, orderBy('score', 'desc'), limit(50));
  
  return onSnapshot(q, (querySnapshot) => {
    const leaderboard = [];
    let rank = 1;
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      leaderboard.push({
        id: doc.id,
        rank,
        ...userData
      });
      rank++;
    });
    
    callback(leaderboard);
  });
};

// User Stats Management
export const updateUserStats = async (userId: string, updates: any) => {
  try {
    const userRef = doc(db, collections.users, userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const currentData = userSnap.data();
      const newData = { ...currentData, ...updates };
      
      // Calculate new score
      if (updates.score) {
        newData.score = (currentData.score || 0) + updates.score;
      }
      
      // Update rank based on new score
      await updateDoc(userRef, {
        ...newData,
        updatedAt: serverTimestamp()
      });
      
      // Update leaderboard
      await updateLeaderboardRank(userId, newData.score);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating user stats:', error);
    return { success: false, error };
  }
};

const updateLeaderboardRank = async (userId: string, score: number) => {
  try {
    // Get all users ordered by score
    const q = query(collection(db, collections.users), orderBy('score', 'desc'));
    const querySnapshot = await getDocs(q);
    
    let rank = 1;
    querySnapshot.forEach((doc) => {
      if (doc.id === userId) {
        // Update user's rank
        updateDoc(doc(db, collections.users, userId), {
          rank
        });
      }
      rank++;
    });
  } catch (error) {
    console.error('Error updating leaderboard rank:', error);
  }
};

// Activity Tracking
export const logActivity = async (userId: string, activity: any) => {
  try {
    await addDoc(collection(db, collections.activities), {
      userId,
      ...activity,
      timestamp: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error logging activity:', error);
    return { success: false, error };
  }
};

// Badge Management
export const awardBadge = async (userId: string, badgeType: string) => {
  try {
    const badgeData = {
      userId,
      badgeType,
      awardedAt: serverTimestamp(),
      description: getBadgeDescription(badgeType)
    };
    
    await addDoc(collection(db, collections.badges), badgeData);
    
    // Update user badge count
    await updateUserStats(userId, { badges: 1 });
    
    return { success: true };
  } catch (error) {
    console.error('Error awarding badge:', error);
    return { success: false, error };
  }
};

const getBadgeDescription = (badgeType: string) => {
  const descriptions = {
    developer: 'Awarded for being the platform developer',
    innovation: 'Awarded for exceptional innovative thinking',
    'problem-solver': 'Successfully solved 10+ problems',
    'top-contributor': 'Recognized as a top contributor',
    mentor: 'Provided mentorship to other contributors'
  };
  return descriptions[badgeType] || 'Awarded for outstanding contribution';
};

// Search functionality
export const searchUsers = async (searchTerm: string) => {
  try {
    const q = query(
      collection(db, collections.users),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );
    
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: users };
  } catch (error) {
    console.error('Error searching users:', error);
    return { success: false, error };
  }
};

export const searchProjects = async (searchTerm: string) => {
  try {
    const q = query(
      collection(db, collections.projects),
      where('title', '>=', searchTerm),
      where('title', '<=', searchTerm + '\uf8ff')
    );
    
    const querySnapshot = await getDocs(q);
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error searching projects:', error);
    return { success: false, error };
  }
}; 