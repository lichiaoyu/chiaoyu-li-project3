import mongoose from "mongoose";
import sudokuSchema from "../schema/sudoku.schema.js";

const SudokuModel =
  mongoose.models.Sudoku || mongoose.model("Sudoku", sudokuSchema);

export function insertSudoku(game) {
  return SudokuModel.create(game);
}

export function getAllSudokus() {
  return SudokuModel.find().exec();
}

export function findSudokuById(id) {
  return SudokuModel.findById(id).exec();
}

export function updateSudokuById(id, updatedData) {
  return SudokuModel.findByIdAndUpdate(id, updatedData, { new: true }).exec();
}

export function deleteSudokuById(id) {
  return SudokuModel.findByIdAndDelete(id).exec();
}

export default SudokuModel;