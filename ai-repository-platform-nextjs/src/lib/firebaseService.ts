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
import { db, storage, collections, userRoles } from './firebase';

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
    let q = collection(db, collections.leaderboard);
    
    if (category !== 'all') {
      q = query(q, where('category', '==', category));
    }
    
    q = query(q, orderBy('score', 'desc'), limit(limit));
    
    const querySnapshot = await getDocs(q);
    const leaderboard = [];
    querySnapshot.forEach((doc) => {
      leaderboard.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: leaderboard };
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return { success: false, error };
  }
};

export const subscribeToLeaderboard = (category: string = 'all', callback: (data: any) => void) => {
  try {
    let q = collection(db, collections.leaderboard);
    
    if (category !== 'all') {
      q = query(q, where('category', '==', category));
    }
    
    q = query(q, orderBy('score', 'desc'), limit(50));
    
    return onSnapshot(q, (querySnapshot) => {
      const leaderboard = [];
      querySnapshot.forEach((doc) => {
        leaderboard.push({ id: doc.id, ...doc.data() });
      });
      callback(leaderboard);
    });
  } catch (error) {
    console.error('Error subscribing to leaderboard:', error);
    return null;
  }
};

// User Stats Management
export const updateUserStats = async (userId: string, updates: any) => {
  try {
    const userRef = doc(db, collections.users, userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const currentData = userSnap.data();
      const newScore = (currentData.score || 0) + (updates.score || 0);
      const newProjects = (currentData.projects || 0) + (updates.projects || 0);
      
      await updateDoc(userRef, {
        ...updates,
        score: newScore,
        projects: newProjects,
        updatedAt: serverTimestamp()
      });
      
      // Update leaderboard
      await updateLeaderboardRank(userId, newScore);
      
      return { success: true };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error updating user stats:', error);
    return { success: false, error };
  }
};

const updateLeaderboardRank = async (userId: string, score: number) => {
  try {
    const leaderboardRef = doc(db, collections.leaderboard, userId);
    await setDoc(leaderboardRef, {
      userId,
      score,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating leaderboard rank:', error);
  }
};

// Activity Logging
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
    const badgeRef = doc(db, collections.badges, `${userId}_${badgeType}`);
    const badgeSnap = await getDoc(badgeRef);
    
    if (!badgeSnap.exists()) {
      await setDoc(badgeRef, {
        userId,
        type: badgeType,
        name: getBadgeDescription(badgeType),
        awardedAt: serverTimestamp()
      });
      
      // Update user badge count
      await updateUserStats(userId, { badges: 1 });
      
      return { success: true };
    } else {
      return { success: false, error: 'Badge already awarded' };
    }
  } catch (error) {
    console.error('Error awarding badge:', error);
    return { success: false, error };
  }
};

const getBadgeDescription = (badgeType: string) => {
  const descriptions = {
    'developer': 'Developer',
    'innovation': 'Innovation',
    'problem-solver': 'Problem Solver',
    'top-contributor': 'Top Contributor',
    'mentor': 'Mentor'
  };
  return descriptions[badgeType] || badgeType;
};

// Search Functions
export const searchUsers = async (searchTerm: string) => {
  try {
    const q = query(
      collection(db, collections.users),
      where('displayName', '>=', searchTerm),
      where('displayName', '<=', searchTerm + '\uf8ff')
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