coupone = input('do you have coupone y/n')

age = int(input('pleae enter your age'))

if ((age > 18 or age < 65) and coupone == 'y'):
    print("you are eligable")
else:
    print("you are not eligable")