import userModel from "./models/user.model.js";
import studentModel from './models/student.model.js'
import courseModel from "./models/courses.model.js";
import mongoose from "mongoose";

const uri = 'mongodb+srv://FranOrtega:elsapopepe.CODERHOUSE@clustertester.b9tsw8l.mongodb.net/?retryWrites=true&w=majority'

const env = async() => {
    await mongoose.connect(uri, {
        dbName: 'clase17'
    })

    console.log('DB Connected');

    // await studentModel.create({
    //     first_name: 'Guti',
    //     last_name: 'Gutierrez',
    // })


    // await courseModel.create({
    //     title: 'Defensa Contra las Artes Oscuras',
    //     description: 'Saber defenderse de ataques oscuros',
    //     difficulty: 5,
    //     topics: ['Spectro Patronus', 'Expelliarmus'],
    //     professor: 'Snape',
    // })

    // const student = await studentModel.findOne({_id: '63d2debe41922fa36f25307d'})

    // student.courses.push({course: '63d2dcc40063e805172fe0ef'})
    // const result = await studentModel.updateOne({_id: '63d2debe41922fa36f25307d'}, student)

    // console.log(result);


    const student = await studentModel.find({_id: '63d2debe41922fa36f25307d'})
    console.log(JSON.stringify(student, null, '\t'));


    process.exit()
}

env()
