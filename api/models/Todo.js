import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  text:{type:String,required:true},
  done:{type:mongoose.SchemaTypes.Boolean,required:true},
  user:{type:mongoose.SchemaTypes.ObjectId},
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;