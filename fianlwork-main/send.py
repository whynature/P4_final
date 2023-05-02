#!/usr/bin/env python3
import argparse
import sys
import socket
import random
import struct
import time
import datetime


from scapy.all import sendp, send, get_if_list, get_if_hwaddr
from scapy.all import Packet
from scapy.all import Ether, IP, UDP, TCP

def get_if():
    ifs=get_if_list()
    iface=None # "h1-eth0"
    for i in get_if_list():
        if "eth0" in i:
            iface=i
            break;
    if not iface:
        print ("Cannot find eth0 interface")
        exit(1)
    return iface

def main():

    if len(sys.argv)<1:
        print ('pass 2 arguments: <destination> <type> <dport> "<message>"')
        exit(1)
    while True:
        addr = socket.gethostbyname(sys.argv[1])
        iface = get_if()
        
        print ("sending on interface %s to %s" % (iface, str(addr)))
        pkt =  Ether(src=get_if_hwaddr(iface), dst='ff:ff:ff:ff:ff:ff')
        a=random.randint(0,1)
        if a==0:
            pkt = pkt /IP(dst=addr) / TCP(dport=int(80), sport=random.randint(10,20)) / ("tcp")
        else:
            pkt = pkt /IP(dst=addr) / UDP(dport=int(80), sport=random.randint(10,20)) / ("udp")
        pkt.show2()
        sendp(pkt, iface=iface, verbose=False)
        time.sleep(0.5)


if __name__ == '__main__':
    main()

