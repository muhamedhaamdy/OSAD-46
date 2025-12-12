package day4.shapes;

import java.util.ArrayList;
import java.util.List;

abstract class Shape {
  public abstract void draw();
}

class Rectangle extends Shape {
  @Override
  public void draw() {
    System.out.println("Drawing Rectangle");
  }
}

class Circle extends Shape {
  @Override
  public void draw() {
    System.out.println("Drawing Circle");
  }
}

public class Main {
  public static void drawShapes(List<? extends Shape> shapes) {
    for (Shape s : shapes) {
      s.draw();
    }
  }

  public static void main(String[] args) {
    List<Rectangle> rectangles = new ArrayList<>();
    rectangles.add(new Rectangle());
    rectangles.add(new Rectangle());
    System.out.println("Testing with List<Rectangle>:");
    drawShapes(rectangles);

    List<Shape> shapes = new ArrayList<>();
    shapes.add(new Circle());
    shapes.add(new Rectangle());
    System.out.println("\nTesting with List<Shape>:");
    drawShapes(shapes);
  }
}
