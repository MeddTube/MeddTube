class CreateMeddjoins < ActiveRecord::Migration
  def change
    create_table :meddjoins do |t|
      t.references :patient, index: true
      t.references :medication, index: true
      t.references :condition, index: true
      t.references :diet, index: true
      t.references :provider, index: true
      t.references :video, index: true

      t.timestamps
    end
  end
end
