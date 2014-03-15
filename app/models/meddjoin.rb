class Meddjoin < ActiveRecord::Base
  belongs_to :patient
  belongs_to :medication
  belongs_to :condition
  belongs_to :diet
  belongs_to :provider
  belongs_to :video
end
