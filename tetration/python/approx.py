from decimal import Decimal, getcontext 
import decimal


ten = Decimal('10')
one = Decimal('1')
small = one

getcontext().prec = 48

precision = 32

for i in range(precision):
  small = small / ten

E = (one + small) ** (ten ** precision)

# euler's number to 32 digits of precision
print("euler's number to 32 digits of precision")
print(E)

test1 = (E ** E ** Decimal('1.8')) ** (E ** Decimal('0.9'))
test2 = (E ** E ** Decimal('1.9')) ** (E ** Decimal('0.8'))
difference = test1 - test2
print(difference)
print ('aim was e^^1.8 ^ e^^0.9')


aim = Decimal('0.99')
test1 = (E ** E) ** (E ** aim)
test2 = (E ** E ** aim) ** E
difference = test1 - test2
print(difference)
print ('aim was e ^^', aim)

test1 = (E ** E) ** (E ** E ** aim)
test2 = (E ** E ** E ** aim) ** E
difference = test1 - test2
print(difference)
print ("aim was e ^^",one + aim)

# start value for approximation of e^^1.99 = e^e^0.99
start = E ** E ** Decimal('0.99')
difference = 1
print ("small value ", small)

initial = start
where = 0
best = 1
for i in range(3):
  test1 = (E ** E) ** (start)
  test2 = (E ** start) ** E
  difference = test1 - test2
  if i == 1:
    best = difference
  if difference < Decimal('0'):
    difference *= -1 
  if difference > precision:
    start += small
  if difference < best:
    best = difference
    where = i  

print ("approximation loop finished")
print ("best outcome ", best)      
print ("at iteration ", where)
print ("initial ", initial)
print ("final ", start)


