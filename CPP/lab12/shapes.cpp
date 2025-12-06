#include "shapes.h"
#include <SFML/Graphics.hpp>

Shape::Shape(float c_ridus, float c_x, float c_y, float r_width, float r_height, float r_x, float r_y)
{
  c = new Circle(c_ridus, c_x, c_y);
  r = new Rectangle(r_width, r_height, r_x, r_y);
}

Shape::Shape(float c_ridus, float r_width, float r_height)
{
  c = new Circle(c_ridus);
  r = new Rectangle(r_width, r_height);
}

Shape::~Shape()
{
  cout << "this shape is already dies" << endl;
  delete (c);
  delete (r);
}
void Shape::run()
{

  sf::RenderWindow window(sf::VideoMode({800, 600}), "Basic Shapes");
  sf::RectangleShape rect({r->w, r->h});
  rect.setFillColor(sf::Color::Blue);
  rect.setPosition({r->x, r->y});

  sf::CircleShape circle(c->r);
  circle.setFillColor(sf::Color::Green);
  circle.setPosition({c->x, c->y});

  // Main Loop
  while (window.isOpen())
  {
    while (const auto event = window.pollEvent())
    {
      if (event->is<sf::Event::Closed>())
        window.close();
    }

    window.clear(); // Clear old frame

    // Draw everything
    window.draw(rect);
    window.draw(circle);

    window.display(); // Show new frame
  }
}