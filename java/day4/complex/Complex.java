package day4.complex;

public class Complex<T extends Number> {
  private T real;
  private T imag;

  public Complex(T real, T imag) {
    this.real = real;
    this.imag = imag;
  }

  public T getReal() {
    return real;
  }

  public T getImag() {
    return imag;
  }

  // Add another complex number to this one
  public Complex<Double> add(Complex<?> other) { 
    double newReal = this.real.doubleValue() + other.getReal().doubleValue();
    double newImag = this.imag.doubleValue() + other.getImag().doubleValue();
    return new Complex<>(newReal, newImag);
  }

  // Subtract another complex number from this one
  public Complex<Double> subtract(Complex<?> other) {
    double newReal = this.real.doubleValue() - other.getReal().doubleValue();
    double newImag = this.imag.doubleValue() - other.getImag().doubleValue();
    return new Complex<>(newReal, newImag);
  }

  // Multiply another complex number with this one
  // (a+bi)(c+di) = (ac-bd) + (ad+bc)i
  public Complex<Double> multiply(Complex<?> other) {
    double a = this.real.doubleValue();
    double b = this.imag.doubleValue();
    double c = other.getReal().doubleValue();
    double d = other.getImag().doubleValue();

    double newReal = (a * c) - (b * d);
    double newImag = (a * d) + (b * c);
    return new Complex<>(newReal, newImag);
  }

  @Override
  public String toString() {
    double i = imag.doubleValue();
    if (i >= 0) {
      return real + " + " + i + "i";
    } else {
      return real + " - " + (-i) + "i";
    }
  }
}
