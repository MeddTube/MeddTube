class CreateProviders < ActiveRecord::Migration
  def change
    create_table :providers do |t|
      t.string :firstname
      t.string :lastname
      t.string :npi
      t.string :license
      t.string :address
      t.string :phone
      t.string :fax

      t.timestamps
    end
  end
end
