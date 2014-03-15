class CreatePatients < ActiveRecord::Migration
  def change
    create_table :patients do |t|
      t.string :firstname
      t.string :lastname
      t.datetime :birthdate
      t.string :address
      t.string :medicalrecordnumber
      t.string :phone

      t.timestamps
    end
  end
end
