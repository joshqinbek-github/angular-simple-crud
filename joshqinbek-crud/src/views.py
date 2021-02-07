from flask import Flask, jsonify, render_template, request, abort
from flask_sqlalchemy import SQLAlchemy

from src import app, db
from src.database.models import User



@app.route('/')
def ServerWorking():
    return jsonify({
        "message": "Server is working",
        "success": True
    })

@app.route('/users', methods = ['GET', 'POST', 'DELETE'])
def UsersGet():
    if request.method == "POST":
        email = request.form["email"]
        username = request.form["username"]
        password = request.form["password"]

        if email and username and password:
            user = User(email=email, username=username, password=password)
            db.session.add(user)
            db.session.commit()
        else:
            abort(400)

        return jsonify({"data": {"message": "Created!", "ok": True}})
    if request.method == "DELETE":
        id = request.form["id"]
        user = User.query.filter_by(id=id).first()

        if user:
            db.session.delete(user)
            db.session.commit()

            return jsonify({"data": {"message": f"{id}-foydalanuvchi o'chirildi!", "ok": True}})  
        else:
            return jsonify({"data": {"message": f"{id}-foydalanuvchi topilmadi!", "ok": False}}) 

    if request.method == "GET":
        user_data = User.query.all()
        data = []
        for i in user_data:
            result = {
                "id": i.id,
                "username": i.username,
                "email": i.email,
                "password": i.password
            }

            data.append(result)

        return jsonify({"data": data})  


# @app.route('/delete/<int:id>', methods = ["GET"])
# def CreateUser(id):
#     if request.method == "GET":
#         user = User.query.filter_by(id=id).first()

#         if user:
#             db.session.delete(user)
#             db.session.commit()

#             return jsonify({"data": {"message": f"{id}-foydalanuvchi o'chirildi!", "ok": True}})  
#         else:
#             return jsonify({"data": {"message": f"{id}-foydalanuvchi topilmadi!", "ok": False}}) 

#     else:
#         return abort(400)