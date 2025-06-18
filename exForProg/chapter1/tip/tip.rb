print 'Type the cost of Bill: '
bill = gets.chomp
print 'Type the cost of tip: '
tip_rate = gets.chomp

bill = bill.to_f
tip_rate = tip_rate.to_f
tip = bill * (tip_rate / 100)
total = bill + tip

puts "the tip is: $ #{tip}"
puts "the total is: $ #{total}"
