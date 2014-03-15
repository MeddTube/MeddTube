class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :name
      t.string :url
      t.string :type
      t.string :thumburl

      t.timestamps
    end
  end
end
