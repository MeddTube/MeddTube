class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :name
      t.string :url
      t.string :category
      t.string :thumburl
      t.string :urlcode


      t.timestamps
    end
  end
end
