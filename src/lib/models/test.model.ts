// lib/models/test.model.ts
import { Model, Schema } from "mongoose";
import createModel from "../createModel";

interface ITest {
  first_name: string;
  last_name: string;
}

interface ITestMethods {
  fullName(): string;
}

type TestModel = Model<ITest, {}, ITestMethods>;

const testSchema = new Schema<ITest, TestModel, ITestMethods>({
  first_name: String,
  last_name: String,
});

testSchema.method("fullName", function fullName() {
  return this.first_name + " " + this.last_name;
});

export default createModel<ITest, TestModel>("tests", testSchema);
