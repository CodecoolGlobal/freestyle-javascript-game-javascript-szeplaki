import connection_handler
from psycopg2.sql import SQL, Literal
import util


@connection_handler.connection_handler
def get_user_by_username(cursor, username):
    query = """SELECT * FROM user_data
                WHERE username = {username}"""
    cursor.execute(SQL(query).format(username=Literal(username)))
    return cursor.fetchall()


@connection_handler.connection_handler
def register_user(cursor, username, password):
    new_password = util.hash_password(password)
    query = """INSERT INTO user_data (username, password) VALUES ({username},
                                            {password})"""
    cursor.execute(SQL(query).format(username=Literal(username),
                                     password=Literal(new_password)))


def verify_log_in_username(username):
    user = get_user_by_username(username)
    for data in user:
        if data['username'] == username:
            return True
    return False


def verifying_log_in_password(username, password):
    user = get_user_by_username(username)
    for data in user:
        hashed_password = data['password']
    return util.verify_password(password, hashed_password)


@connection_handler.connection_handler
def get_highscores(cursor):
    query = """SELECT username, score
               FROM user_data"""
    cursor.execute(SQL(query))
    return cursor.fetchall()


@connection_handler.connection_handler
def update_score(cursor, username, score):
    query = """UPDATE user_data
               SET score = {score}
               WHERE username = {username}"""
    cursor.execute(SQL(query).format(username=Literal(username), score=Literal(score)))
