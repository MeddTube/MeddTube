class CreateLabs < ActiveRecord::Migration
  def change
    create_table :labs do |t|
      t.string :name
      t.float :value
      t.string :units
      t.datetime :datedrawn
      t.references :patient, index: true


      t.timestamps
    end
  end
end
