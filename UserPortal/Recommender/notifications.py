from CollaborativeFiltering.database import mycursor

def register_notification(values):
    sql = """"
            INSERT INTO NOTIFICATIONS (TYPE, FROM_ID, TO_ID, MESSAGE) 
            VALUES (%s, %s, %s, %s)
          """

    mycursor.execute(sql, values)