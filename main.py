from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()#python framework that help to manager api built in python
# Add CORS middleware- cross origin resource sharing
app.add_middleware(
    CORSMiddleware,#middleware of fastapi that helps to us to manage cors
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],# yeh line saare headers ko allow karta hai jo koi bhi browser request me add kar sakta hai.
)
#'mongodb+srv://' connection protocol hai
#'cluster0.9zca08r.mongodb.net' MongoDB server ka address hai,
client = MongoClient('mongodb+srv://sandeep:sandeep@cluster0.9zca08r.mongodb.net/test')
db = client['employee_db']
collection = db['employee']

class Employee(BaseModel):
    employee_id: int
    employee_name: str
    employee_email: str
    employee_manager: str

class UpdateEmployee(BaseModel):
    employee_name: Optional[str]
    employee_email: Optional[str]
    employee_manager: Optional[str]

@app.get("/")
async def read_root():
    return {"message": "Welcome to Employee Management API!"}

@app.post("/employee/")
async def create_employee(employee: Employee):
    employee_dict = employee.dict()
    collection.insert_one(employee_dict)
    return {"message": "Employee added successfully."}

@app.get("/employees/")
async def get_all_employees():
    employees = []
    for employee in collection.find():
        employee["_id"] = str(employee["_id"])
        employees.append(employee)
    return employees


@app.get("/employee/{employee_id}")
async def get_employee(employee_id: int):
    employee = collection.find_one({"employee_id": employee_id})
    if employee:
        return  {
            "message": "Employee found",
            "id": employee["employee_id"],
            "name": employee["employee_name"],
            "email": employee["employee_email"],
            "manager": employee["employee_manager"]
        } 
    else:
        return {"error": "Employee not found."}

@app.put("/employee/{employee_id}")
async def update_employee(employee_id: int, employee: UpdateEmployee):
    employee_dict = employee.dict(exclude_unset=True)
    result = collection.update_one({"employee_id": employee_id}, {"$set": employee_dict})
    if result.modified_count == 1:
        return {"message": "Employee updated successfully."}
    else:
        return {"error": "Employee not found."}

@app.delete("/employee/{employee_id}")
async def delete_employee(employee_id: int):
    result = collection.delete_one({"employee_id": employee_id})
    if result.deleted_count == 1:
        return {"message": "Employee deleted successfully."}
    else:
        return {"error": "Employee not found."}


@app.get("/shutdown")
async def shutdown():
    import os
    import signal
    os.kill(os.getpid(), signal.SIGINT)
    return "Shutting down..."
