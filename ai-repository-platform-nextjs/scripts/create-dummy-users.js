// Script to create dummy users for testing
// Run this with: node scripts/create-dummy-users.js

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyD-8w8QwQwQwQwQwQwQwQwQwQwQwQwQwQ",
  authDomain: "ai-repository-platform.firebaseapp.com",
  projectId: "ai-repository-platform",
  storageBucket: "ai-repository-platform.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const dummyUsers = [
  {
    email: 'contributor@test.com',
    password: 'password123',
    role: 'contributor',
    name: 'John Contributor',
    bio: 'Passionate student developer working on AI projects'
  },
  {
    email: 'professional@test.com',
    password: 'password123',
    role: 'professional',
    name: 'Sarah Professional',
    bio: 'Senior Developer at TechCorp, looking for talented contributors'
  },
  {
    email: 'student@test.com',
    password: 'password123',
    role: 'contributor',
    name: 'Alex Student',
    bio: 'Computer Science student interested in web development'
  }
];

async function createDummyUsers() {
  console.log('Creating dummy users...');
  
  for (const userData of dummyUsers) {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        bio: userData.bio,
        avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        score: Math.floor(Math.random() * 1000),
        rank: Math.floor(Math.random() * 100),
        projects: Math.floor(Math.random() * 10),
        badges: Math.floor(Math.random() * 5),
        views: Math.floor(Math.random() * 500),
        likes: Math.floor(Math.random() * 100)
      });
      
      console.log(`✅ Created user: ${userData.email} (${userData.role})`);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️  User already exists: ${userData.email}`);
      } else {
        console.error(`❌ Error creating user ${userData.email}:`, error.message);
      }
    }
  }
  
  console.log('\n🎉 Dummy users creation completed!');
  console.log('\n📋 Test Credentials:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  dummyUsers.forEach(user => {
    console.log(`👤 ${user.name} (${user.role})`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Password: ${user.password}`);
    console.log('');
  });
}

createDummyUsers().catch(console.error); 