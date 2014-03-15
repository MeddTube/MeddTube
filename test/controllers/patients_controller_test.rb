require 'test_helper'

class PatientsControllerTest < ActionController::TestCase
  setup do
    @patient = patients(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:patients)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create patient" do
    assert_difference('Patient.count') do
      post :create, patient: { address: @patient.address, birthdate: @patient.birthdate, condition_id: @patient.condition_id, diet_id: @patient.diet_id, firstname: @patient.firstname, lastname: @patient.lastname, medicalrecordnumber: @patient.medicalrecordnumber, medication_id: @patient.medication_id, phone: @patient.phone }
    end

    assert_redirected_to patient_path(assigns(:patient))
  end

  test "should show patient" do
    get :show, id: @patient
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @patient
    assert_response :success
  end

  test "should update patient" do
    patch :update, id: @patient, patient: { address: @patient.address, birthdate: @patient.birthdate, condition_id: @patient.condition_id, diet_id: @patient.diet_id, firstname: @patient.firstname, lastname: @patient.lastname, medicalrecordnumber: @patient.medicalrecordnumber, medication_id: @patient.medication_id, phone: @patient.phone }
    assert_redirected_to patient_path(assigns(:patient))
  end

  test "should destroy patient" do
    assert_difference('Patient.count', -1) do
      delete :destroy, id: @patient
    end

    assert_redirected_to patients_path
  end
end
