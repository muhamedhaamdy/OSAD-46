def valid_id(id, students):
    if id < 0 or len(students) > id:
        raise Exception('not valid id')