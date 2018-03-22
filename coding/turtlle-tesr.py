# import turtle

# myTurtle = turtle.Turtle()
# myWin = turtle.Screen()


# def drawSpiral(myTurtle, lineLen):
#     if lineLen > 0:
#         myTurtle.forward(lineLen)
#         myTurtle.right(90)
#         drawSpiral(myTurtle, lineLen-5)


# drawSpiral(myTurtle, 100)

# myWin.exitonclick()
# -------------------------------------------------------------
# import turtle
# import random as r


# def tree(branchLen, t):
#     if branchLen > 5:
#         t.width(branchLen/10)
#         t.color((0, 1-branchLen/100, 0))

#         t.forward(branchLen)

#         right_angle = r.randint(10, 30)
#         t.right(right_angle)
#         tree(branchLen-r.randint(6, 9), t)
#         t.left(right_angle)
#         left_angle = r.randint(10, 30)
#         t.left(left_angle)
#         tree(branchLen-r.randint(6, 9), t)
#         t.right(left_angle)

#         t.backward(branchLen)


# def main():
#     t = turtle.Turtle()
#     myWin = turtle.Screen()

#     t.left(90)
#     t.up()
#     t.backward(100)
#     t.down()
#     # t.screen.colormode(100)
#     # t.color((0, 0, 0))

#     t.speed(0)
#     t.screen.tracer(500)

#     tree(75, t)
#     myWin.exitonclick()


# main()

# ------------------------------------------------
import turtle
import random as r


def drawTriangle(points, color, myTurtle):
    myTurtle.fillcolor(color)
    myTurtle.up()
    myTurtle.goto(points[0][0], points[0][1])
    myTurtle.down()
    myTurtle.begin_fill()
    myTurtle.goto(points[1][0], points[1][1])
    myTurtle.goto(points[2][0], points[2][1])
    myTurtle.goto(points[0][0], points[0][1])
    myTurtle.end_fill()


def getMid(p1, p2):
    return ((p1[0]+p2[0]) / 2, (p1[1] + p2[1]) / 2)


def sierpinski(points, degree, myTurtle):
    colormap = ['blue', 'red', 'green', 'white', 'yellow',
                'violet', 'orange']
    # drawTriangle(points, colormap[degree % 7], myTurtle)
    drawTriangle(points, colormap[r.randint(0, 6)], myTurtle)
    if degree > 0:
        sierpinski([points[0],
                    getMid(points[0], points[1]),
                    getMid(points[0], points[2])],
                   degree-1, myTurtle)
        sierpinski([points[1],
                    getMid(points[0], points[1]),
                    getMid(points[1], points[2])],
                   degree-1, myTurtle)
        sierpinski([points[2],
                    getMid(points[2], points[1]),
                    getMid(points[0], points[2])],
                   degree-1, myTurtle)


def main():
    myTurtle = turtle.Turtle()
    myWin = turtle.Screen()

    myTurtle.speed(0)
    # myTurtle.screen.tracer(500)
    # myTurtle.screen.tracer(False)

    myPoints = [[-400, -200], [0, 400], [400, -200]]
    sierpinski(myPoints, 4, myTurtle)
    myWin.exitonclick()


main()
