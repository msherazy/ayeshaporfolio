// Script để migrate data hiện tại lên Firebase
// Chạy: node scripts/migrate-data.js

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

const projects = [
  {
    title: "E-Commerce REST API",
    description:
      "A robust REST API for e-commerce platform built with Node.js and Express.js, featuring JWT authentication, payment integration, and comprehensive documentation.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Stripe API"],
    github: "https://github.com/Thinhtran42/ecommerce-api",
    demo: "https://api-demo.herokuapp.com/docs",
    featured: true,
  },
  {
    title: "Real-time Chat Application",
    description:
      "A scalable real-time chat application with Socket.io, featuring group chats, message encryption, and user presence indicators.",
    image:
      "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Node.js", "Socket.io", "Redis", "PostgreSQL", "JWT"],
    github: "https://github.com/Thinhtran42/realtime-chat",
    demo: "https://chat-app-demo.herokuapp.com",
    featured: true,
  },
  {
    title: "Task Management API",
    description:
      "RESTful API for task management with team collaboration, file uploads, and comprehensive reporting endpoints.",
    image:
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "MongoDB",
      "Cloudinary",
    ],
    github: "https://github.com/Thinhtran42/task-api",
    demo: "https://task-api-docs.herokuapp.com",
    featured: false,
  },
  {
    title: "Microservices Architecture",
    description:
      "A microservices-based application with API Gateway, user service, and product service, deployed with Docker.",
    image:
      "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Node.js", "Docker", "nginx", "MongoDB", "Redis"],
    github: "https://github.com/Thinhtran42/microservices-demo",
    demo: "https://microservices-demo.herokuapp.com",
    featured: false,
  },
  {
    title: "Authentication Service",
    description:
      "Secure authentication microservice with JWT, refresh tokens, email verification, and password reset functionality.",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Node.js", "JWT", "bcrypt", "Nodemailer", "MongoDB"],
    github: "https://github.com/Thinhtran42/auth-service",
    demo: "https://auth-service-demo.herokuapp.com",
    featured: false,
  },
  {
    title: "File Upload Service",
    description:
      "Scalable file upload service with multiple storage options, image processing, and CDN integration.",
    image:
      "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600",
    technologies: ["Node.js", "Multer", "Sharp", "AWS S3", "CloudFront"],
    github: "https://github.com/Thinhtran42/file-upload-service",
    demo: "https://upload-service-demo.herokuapp.com",
    featured: false,
  },
];

async function migrateData() {
  console.log('Bắt đầu migrate data...');
  
  try {
    for (const project of projects) {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...project,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`✅ Đã thêm project: ${project.title} (ID: ${docRef.id})`);
    }
    
    console.log('🎉 Migrate data thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi migrate data:', error);
  }
}

migrateData(); 