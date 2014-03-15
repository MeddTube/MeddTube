class CreatePatients < ActiveRecord::Migration
  def change
    create_table :patients do |t|
      t.string :firstname
      t.string :lastname
      t.datetime :birthdate
      t.string :address
      t.string :medicalrecordnumber
      t.string :phone
      t.references :medication, index: true
      t.references :diet, index: true
      t.references :condition, index: true

      t.timestamps
    end
  end
end
