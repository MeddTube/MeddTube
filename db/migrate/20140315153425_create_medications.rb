class CreateMedications < ActiveRecord::Migration
  def change
    create_table :medications do |t|
      t.string :name
      t.string :route
      t.string :frequency
      t.integer :dosage
      t.string :doesageunits
      t.datetime :orderdate
      t.references :provider, index: true
      t.string :prnstatus
      t.string :description

      t.timestamps
    end
  end
end
