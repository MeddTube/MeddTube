# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Patient.create!([
  {firstname: "Simba", lastname: "Lion", birthdate: Time.new(1994, 6, 15), phone: 5555555555, address: "Pride Rock, Africa", medicalrecordnumber: 100},
  {firstname: "Rafiki", lastname: "Baboon", birthdate: Time.new(1964, 12, 15), phone: 5555555555, address: "Wise Tree, Africa", medicalrecordnumber: 200}
  ])

Condition.create!([
  {name: "Tiger Breath" , dateonset: Time.now , icd9: "abc123" , description: "really smelly breath in the morning"},
  {name: "Foolishness"  , dateonset: Time.new(2012, 10, 31) ,icd9: "Hal000" ,description: "random acts of crazy"},
  {name: "Tiger Beat" , dateonset: Time.new(1999, 12, 31) , icd9: "dev456", description:"teenage heartache"}
  ])

Diet.create!([
  {name: "Carnivor", restrictions: "Do not eat veggies", guidelines: "Eat Meat",recomendations: "Eat Zebra or Hippo"},
  {name: "Herbivore", restrictions: "Do not eat meat", guidelines: "Eat Veggies",recomendations: "You no eat meat?! Okay, I'll cook lamb"},
  ])

Lab.create!([
  {name: "Lab 1",value: 100, units: "mg", datedrawn: Time.now, patient_id: 1},
  {name: "Lab 2",value: 50, units: "lt", datedrawn: Time.now, patient_id: 2}
  ])

Medication.create!([
  {name: "Chill Pill" , route: "orally" , frequency: "daily", dosage: "10", doesageunits: "pills", orderdate: Time.now, prnstatus: "as needed", description: "take this in the morning for a calm day" },
  {name: "Potassium Chloride Oral" , route: "PO" , frequency: "once", dosage: "10", doesageunits: "mEq", orderdate: Time.now-20.days, prnstatus: "as needed", description: "your daily banana" },
  {name: "Heparin Drip" , route: "IV Cont Infusion" , frequency: "continuous", dosage: "500", doesageunits: "unit/hr", orderdate: Time.now-20.days, prnstatus: "as needed", description: "this keeps your heart going" },
  ])

Provider.create!([{firstname: "Henry", lastname: "Wei", npi: "123out", license: "MD", address: "7 Seventh Ave, NY, NY", phone: 1234567890, fax: 98765432120},
  {firstname: "David", lastname: "Tsay", npi: "456mix", license: "MD", address: "7 Seventh Ave, NY, NY", phone: 1234567890, fax: 98765432120}])

Video.create!([
  {name: "Hakuna Matata", url: "https://www.youtube.com/watch?v=xB5ceAruYrI", category: "Medication", thumburl: "http://images4.fanpop.com/image/photos/20100000/The-Lion-King-1-the-lion-king-20129074-1150-666.jpg"},
  {name: "I can't wait to be King", url: "https://www.youtube.com/watch?v=ywjX6AF6oVc", category: "Medication", thumburl: "http://www.thewrap.com/sites/default/files/The-Lion-King.jpeg"},
  {name: "Circle of Life", url: "https://www.youtube.com/watch?v=8zLx_JtcQVI", category: "Condition", thumburl: "http://www.sheckys.com/files/2014/03/The-Lion-King-1-the-lion-king-20129349-1150-673.jpg"},
  {name: "Can you Feel the Love Tonight", url: "https://www.youtube.com/watch?v=aF4CWCXirZ8", category: "Diet", thumburl: "http://timenewsfeed.files.wordpress.com/2011/05/lion_king.jpg?w=455&h=303&crop=1"}
  ])

Meddjoin.create([
  {patient_id: 1 , medication_id: 1 , condition_id: 2 , provider_id: 1 , video_id: 1},
  {patient_id: 2 , medication_id: 2 , provider_id: 1 , video_id: 2},
  {patient_id: 1 , medication_id: 3 , condition_id: 1 , diet_id: 1 , provider_id: 2 , video_id: 3},
  {patient_id: 2 , condition_id: 3 , diet_id: 2 , provider_id: 2 , video_id: 4}
  ])


