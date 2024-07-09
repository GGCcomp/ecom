import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { NewArrival } from '@/utils/schema';

if (!mongoose.connection.readyState) {
  mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(){
    try{
        const newArrival = await NewArrival.find();
        return NextResponse.json(newArrival)
    }catch(err){
        return NextResponse.json({error:'Something went wrong!'})
    }
}