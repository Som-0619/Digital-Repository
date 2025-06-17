// Mock authentication system for testing without Firebase
export interface MockUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface MockUserProfile {
  name: string;
  email: string;
  role: 'contributor' | 'professional';
  bio?: string;
  avatar?: string;
  score: number;
  rank: number;
  projects: number;
  badges: number;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mock users database
const mockUsers: Record<string, { user: MockUser; profile: MockUserProfile }> = {
  'contributor@test.com': {
    user: {
      uid: 'contributor-1',
      email: 'contributor@test.com',
      displayName: 'John Contributor',
      photoURL: 'https://ui-avatars.com/api/?name=John+Contributor&background=random'
    },
    profile: {
      name: 'John Contributor',
      email: 'contributor@test.com',
      role: 'contributor',
      bio: 'Passionate student developer working on AI projects',
      avatar: 'https://ui-avatars.com/api/?name=John+Contributor&background=random',
      score: 850,
      rank: 15,
      projects: 5,
      badges: 3,
      views: 1200,
      likes: 45,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date()
    }
  },
  'professional@test.com': {
    user: {
      uid: 'professional-1',
      email: 'professional@test.com',
      displayName: 'Sarah Professional',
      photoURL: 'https://ui-avatars.com/api/?name=Sarah+Professional&background=random'
    },
    profile: {
      name: 'Sarah Professional',
      email: 'professional@test.com',
      role: 'professional',
      bio: 'Senior Developer at TechCorp, looking for talented contributors',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Professional&background=random',
      score: 1200,
      rank: 8,
      projects: 12,
      badges: 5,
      views: 2500,
      likes: 120,
      createdAt: new Date('2023-11-20'),
      updatedAt: new Date()
    }
  },
  'student@test.com': {
    user: {
      uid: 'student-1',
      email: 'student@test.com',
      displayName: 'Alex Student',
      photoURL: 'https://ui-avatars.com/api/?name=Alex+Student&background=random'
    },
    profile: {
      name: 'Alex Student',
      email: 'student@test.com',
      role: 'contributor',
      bio: 'Computer Science student interested in web development',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Student&background=random',
      score: 450,
      rank: 45,
      projects: 2,
      badges: 1,
      views: 300,
      likes: 15,
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date()
    }
  }
};

// Mock authentication functions
export const mockSignInWithEmailAndPassword = async (email: string, password: string): Promise<MockUser> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (password !== 'password123') {
    throw new Error('auth/wrong-password');
  }
  
  const userData = mockUsers[email];
  if (!userData) {
    throw new Error('auth/user-not-found');
  }
  
  return userData.user;
};

export const mockCreateUserWithEmailAndPassword = async (
  email: string, password: string, role: 'contributor' | 'professional' = 'contributor', name?: string
): Promise<MockUser> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (mockUsers[email]) {
    throw new Error('auth/email-already-in-use');
  }
  const newUser: MockUser = {
    uid: `user-${Date.now()}`,
    email,
    displayName: name || email.split('@')[0],
    photoURL: `https://ui-avatars.com/api/?name=${(name || email.split('@')[0])}&background=random`
  };
  const newProfile: MockUserProfile = {
    name: name || email.split('@')[0],
    email,
    role,
    bio: 'New user',
    avatar: newUser.photoURL,
    score: 0,
    rank: 0,
    projects: 0,
    badges: 0,
    views: 0,
    likes: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mockUsers[email] = { user: newUser, profile: newProfile };
  return newUser;
};

export const mockGetUserProfile = async (uid: string): Promise<MockUserProfile | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  for (const userData of Object.values(mockUsers)) {
    if (userData.user.uid === uid) {
      return userData.profile;
    }
  }
  
  return null;
};

export const mockUpdateUserProfile = async (uid: string, updates: Partial<MockUserProfile>): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  for (const userData of Object.values(mockUsers)) {
    if (userData.user.uid === uid) {
      userData.profile = { ...userData.profile, ...updates, updatedAt: new Date() };
      break;
    }
  }
};

export const mockSignOut = async (): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
}; 