from decimal import Decimal, getcontext 
import decimal

base = Decimal('10')
logBase = base.ln()
two = Decimal('2')
one = Decimal('1')
quad1 = (two * logBase) / (one + logBase)
quad2 = (one - logBase) / (one + logBase)

PRECISION = 48
getcontext().prec = PRECISION

aim = Decimal('0.5')
test1 = (base ** base) ** (base ** aim)
test2 = (base ** base ** aim) ** base
difference = test1 - test2
# print (test1)
# print (test2)
print (difference)
print ('difference for ', base,' ^^', aim)
print ('linear approximation for', base,' ^^', aim)
print (base**aim)
print ('quadratic approximation for ', base,' ^^', aim)
quadApprox = (base**(one+quad1*(-aim)-quad2*aim*aim))
print (quadApprox)
qtest1 = (base ** base) ** quadApprox
qtest2 = (base ** quadApprox) ** base
print ('difference for quadratic approximation ', qtest1 - qtest2)

# start value for approximation of base^^0.5 = base^base^0.5
#start = base ** Decimal('0.5')
IMPROVE = Decimal('100000')
start = quadApprox
difference  = qtest1 - qtest2
if difference < 0:
  difference = -difference
precision = difference / IMPROVE
small = precision
print ("small value ", small)
print ('precision ', precision)

initial = start
initialSmall = small
initialDifference = difference
where = 0
best = 1
bestApprox = initial
MaxIterations = 1000
for i in range(MaxIterations):
  test1 = (base ** base) ** start
  test2 = (base ** start) ** base
  difference = test1 - test2
  if difference < 0:
    difference = - difference 
  if i == 1:
    best = difference
  if difference < Decimal('0'):
    difference *= -1 
  if difference > precision:
    start += small    
  if difference > initialDifference:
    start -= small
  if difference < best:
    best = difference
    bestApprox = start
    where = i  

print ("approximation loop finished")
print ("best outcome ", best)      
print ("at iteration ", where)
print ("initial difference ", initialDifference)
print ("difference at end of loop ", difference)
print ("initial ", initial)
print ("best approximation ", bestApprox)
print ("final ", start)
print ("initial small value", initialSmall)
print ("small value", small)
    
    
