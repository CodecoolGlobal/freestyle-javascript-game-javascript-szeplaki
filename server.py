from flask import Flask, render_template, redirect, request, url_for, session
import data_handler

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\xec]/'


@app.route('/')
def index():
    if 'username' in session:
        message = "You are logged in"
        return render_template('index.html', message=message)
    return redirect(url_for('login'))


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if not data_handler.verify_log_in_username(username):
            error_1 = "Username invalid!Try again, or "
            return render_template('login.html', error_1=error_1)
        elif not data_handler.verifying_log_in_password(username, password):
            error_2 = "Password invalid, pls try again"
            return render_template('login.html', error_2=error_2)
        session['username'] = username
        return redirect('/')
    return render_template('login.html')


@app.route('/registration', methods=['POST', 'GET'])
def register_user():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        data_handler.register_user(username, password)
        return redirect(url_for('login'))
    return render_template('registration.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))


if __name__ == "__main__":
    app.run(debug=True)
