import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('La variable de entorno MONGO_URI no está definida.');
    }

    await mongoose.connect(mongoURI);
    console.log('🔌 Conexión exitosa a MongoDB Document Database.');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};