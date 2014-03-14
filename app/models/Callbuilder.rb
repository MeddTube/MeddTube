# Use OpenTok Gem
require 'opentok'

class Callbuilder
  
  # Creating an OpenTok Object
  API_KEY = '44684852'     # replace with your OpenTok API key
  API_SECRET = '896b4ab8446d4e488f66e4b747e90b732130e14a'  # replace with your OpenTok API secret
  
  attr_accessor :sessionID, :token
  
  def initialize
    opentok = OpenTok::OpenTokSDK.new API_KEY, API_SECRET 
    session_properties = {OpenTok::SessionPropertyConstants::P2P_PREFERENCE => "disabled"}
    # @sessionID = opentok.create_session request.remote_addr, session_properties
    @sessionID = opentok.createSession( nil, session_properties ).to_s
    puts @sessionID
    puts "asdfasdfasdfasdfasdfas     asdfasdfasdfasfdas"
    
    @token = opentok.generate_token :session_id => @sessionID
  end
end