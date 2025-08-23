// Script để migrate experience data lên Firebase
// Chạy: node scripts/migrate-experiences.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

const firebaseConfig = {
  // Sử dụng config thực tế từ Firebase Console
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const experiences = [
  {
    title: "Junior Back End Golang",
    company: "Be Earning",
    location: "Ho Chi Minh City, Vietnam",
    period: "Mar 2025 - May 2025",
    description: [
      "Developed backend services in Golang with focus on scalability and performance",
      "Applied clean architecture and domain-driven design in production-level code",
      "Collaborated with cross-functional teams to deliver high-quality software solutions",
      "Implemented efficient APIs and microservices architecture",
    ],
    technologies: [
      "Golang",
      "Microservices",
      "Clean Architecture",
      "Domain-Driven Design",
      "RESTful APIs",
      "Git",
    ],
    featured: true,
  },
  {
    title: ".NET Intern",
    company: "FPT Software HCM",
    location: "Ho Chi Minh City, Vietnam",
    period: "Sep 2023 - Jan 2024",
    description: [
      "Participated in both Backend and Frontend Developer Teams to implement the application",
      "Worked with the BA Team and Test Team to finalize the Detailed Design Document",
      "Gained hands-on experience with full-stack development using .NET technologies",
      "Collaborated in an agile development environment with cross-functional teams",
    ],
    technologies: [
      ".NET",
      "C#",
      "ASP.NET",
      "SQL Server",
      "JavaScript",
      "HTML/CSS",
    ],
    featured: true,
  },
];

async function migrateExperiences() {
  console.log('Bắt đầu migrate experience data...');
  
  try {
    for (const experience of experiences) {
      const docRef = await addDoc(collection(db, 'experiences'), {
        ...experience,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`✅ Đã thêm experience: ${experience.title} tại ${experience.company} (ID: ${docRef.id})`);
    }
    
    console.log('🎉 Migrate experience data thành công!');
    console.log(`📊 Đã thêm ${experiences.length} experiences vào Firebase`);
  } catch (error) {
    console.error('❌ Lỗi khi migrate experience data:', error);
  }
  
  process.exit(0);
}

migrateExperiences(); 