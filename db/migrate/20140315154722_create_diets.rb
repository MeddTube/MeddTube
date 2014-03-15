class CreateDiets < ActiveRecord::Migration
  def change
    create_table :diets do |t|
      t.string :name
      t.text :restrictions
      t.text :guidelines
      t.text :recomendations

      t.timestamps
    end
  end
end
