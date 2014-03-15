class CreateConditions < ActiveRecord::Migration
  def change
    create_table :conditions do |t|
      t.string :name
      t.datetime :dateonset
      t.string :icd9
      t.string :description

      t.timestamps
    end
  end
end
