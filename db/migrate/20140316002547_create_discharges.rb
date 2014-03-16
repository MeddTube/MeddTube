class CreateDischarges < ActiveRecord::Migration
  def change
    create_table :discharges do |t|
      t.string :title
      t.references :patient, index: true
      t.text :instructions

      t.timestamps
    end
  end
end
