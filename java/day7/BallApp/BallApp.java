import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.Color;
import java.awt.Graphics;

public class BallApp extends JFrame implements Runnable {

  Thread th;
  BallPanel ballPanel = new BallPanel();

  public BallApp() {
    this.setTitle("Moving Ball Application");
    this.setBounds(50, 50, 600, 400);
    this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    this.add(ballPanel);

    th = new Thread(this);
    th.start();
    this.setVisible(true);
  }

  public static void main(String[] args) {
    new BallApp();
  }

  @Override
  public void run() {
    while (true) {
      try {
        ballPanel.moveBall();
        ballPanel.repaint();
        Thread.sleep(10);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }

  class BallPanel extends JPanel {
    int x = 10;
    int y = 10;
    int dx = 2;
    int dy = 2;
    int diameter = 30;

    public void moveBall() {
      if (x + diameter >= this.getWidth() || x < 0) {
        dx = -dx;
      }
      if (y + diameter >= this.getHeight() || y < 0) {
        dy = -dy;
      }
      x += dx;
      y += dy;
    }

    @Override
    public void paintComponent(Graphics g) {
      super.paintComponent(g);
      g.setColor(Color.RED);
      g.fillOval(x, y, diameter, diameter);
    }
  }
}
