# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140316054219) do

  create_table "conditions", force: true do |t|
    t.string   "name"
    t.datetime "dateonset"
    t.string   "icd9"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "diets", force: true do |t|
    t.string   "name"
    t.text     "restrictions"
    t.text     "guidelines"
    t.text     "recomendations"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "discharges", force: true do |t|
    t.string   "title"
    t.integer  "patient_id"
    t.text     "instructions"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "discharges", ["patient_id"], name: "index_discharges_on_patient_id"

  create_table "labs", force: true do |t|
    t.string   "name"
    t.float    "value"
    t.string   "units"
    t.datetime "datedrawn"
    t.integer  "patient_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "labs", ["patient_id"], name: "index_labs_on_patient_id"

  create_table "meddjoins", force: true do |t|
    t.integer  "patient_id"
    t.integer  "medication_id"
    t.integer  "condition_id"
    t.integer  "diet_id"
    t.integer  "provider_id"
    t.integer  "video_id"
    t.integer  "discharge_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "meddjoins", ["condition_id"], name: "index_meddjoins_on_condition_id"
  add_index "meddjoins", ["diet_id"], name: "index_meddjoins_on_diet_id"
  add_index "meddjoins", ["discharge_id"], name: "index_meddjoins_on_discharge_id"
  add_index "meddjoins", ["medication_id"], name: "index_meddjoins_on_medication_id"
  add_index "meddjoins", ["patient_id"], name: "index_meddjoins_on_patient_id"
  add_index "meddjoins", ["provider_id"], name: "index_meddjoins_on_provider_id"
  add_index "meddjoins", ["video_id"], name: "index_meddjoins_on_video_id"

  create_table "medications", force: true do |t|
    t.string   "name"
    t.string   "route"
    t.string   "frequency"
    t.integer  "dosage"
    t.string   "doesageunits"
    t.datetime "orderdate"
    t.string   "prnstatus"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "patients", force: true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.datetime "birthdate"
    t.string   "address"
    t.string   "medicalrecordnumber"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "providers", force: true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "npi"
    t.string   "license"
    t.string   "address"
    t.string   "phone"
    t.string   "fax"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "password_salt"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

  create_table "videos", force: true do |t|
    t.string   "name"
    t.string   "url"
    t.string   "category"
    t.string   "thumburl"
    t.string   "urlcode"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "votes", force: true do |t|
    t.integer  "votable_id"
    t.string   "votable_type"
    t.integer  "voter_id"
    t.string   "voter_type"
    t.boolean  "vote_flag"
    t.string   "vote_scope"
    t.integer  "vote_weight"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope"
  add_index "votes", ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope"

end
