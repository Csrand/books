class Hello
  def initialize(name, nacionality)
    @name = name
    @nacionality = nacionality
  end

  def greet
    case @nacionality.downcase
    when 'brazilian', 'brasileiro'
      puts "Olá #{@name}!"
    when 'chinese', 'chinês', 'chinesa'
      puts "Nǐ hǎo #{@name}!"
    else
      puts "Hello #{@name}!"
    end
  end
end

pessoa1 = Hello.new('csrand', 'brazilian')
pessoa2 = Hello.new('ana', 'chinese')

pessoa1.greet
pessoa2.greet
