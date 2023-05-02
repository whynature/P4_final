import read_packet
import time


while True:
    
    read_packet.read_and_save("s1-eth1_in")
    read_packet.read_and_save("s2-eth1_in")
    read_packet.read_and_save("s3-eth1_in")
    read_packet.read_and_save("s4-eth1_in")
    read_packet.read_and_save("s5-eth1_in")
    read_packet.read_and_save("s6-eth2_in")
    read_packet.read_and_save("s6-eth3_in")
    read_packet.read_and_save("s6-eth4_in")
    read_packet.read_and_save("s6-eth5_in")

    time.sleep(1)