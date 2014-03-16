class PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :edit, :update, :destroy, :videoplay]
  def videoplay
    @youtubeid = params[:youtubeid]
    respond_to do |format|
      format.html { redirect_to :back, notice: "click play to view video"  }
      format.js { render layout: false }
    end
  end
  # GET /patients
  # GET /patients.json
  def index
    @patients = Patient.all

  end

  # GET /patients/1
  # GET /patients/1.json
  def show
    @conditions = Condition.patients_conditions(@patient)
    # @discharge = Patient.find(@patient).discharges.take
  end

  # GET /patients/new
  def new
    @patient = Patient.new
  end

  # GET /patients/1/edit
  def edit
  end

  # POST /patients
  # POST /patients.json
  def create
    @patient = Patient.new(patient_params)

    respond_to do |format|
      if @patient.save
        format.html { redirect_to @patient, notice: 'Patient was successfully created.' }
        format.json { render action: 'show', status: :created, location: @patient }
      else
        format.html { render action: 'new' }
        format.json { render json: @patient.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /patients/1
  # PATCH/PUT /patients/1.json
  def update
    respond_to do |format|
      if @patient.update(patient_params)
        format.html { redirect_to @patient, notice: 'Patient was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @patient.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /patients/1
  # DELETE /patients/1.json
  def destroy
    @patient.destroy
    respond_to do |format|
      format.html { redirect_to patients_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient
      if params[:patient_id]
        @patient = Patient.find(params[:patient_id])
      else
        @patient = Patient.find(params[:id])
      end
      
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def patient_params
      params.require(:patient).permit(:firstname, :lastname, :birthdate, :address, :medicalrecordnumber, :phone, :medication_id, :diet_id, :condition_id)
    end
end
