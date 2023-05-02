import scapy.all as scapy
import time
import os
  # 读取pcap文件



sport={}

def solve_string(s):
    s=s.strip()
    s=int(s)
    return s

def read(file):
    use=file.readline()
    try:
        use=solve_string(use)
    except:
        use=0
    return use


def read_and_save(file_name):
    # for i in range(10,21):
    #     sport[i]=0
    readed=0
    udpcount=0
    tcpcount=0
    ecn_full=0
    if os.path.exists("./record_file/"+file_name+".txt"):
        f=open("./record_file/"+file_name+".txt","r")
        readed=read(f)
        tcpcount=read(f)
        udpcount=read(f)
        ecnfull=read(f)

        f.close()

    # while True:
    while True:
        try:
            packets = scapy.rdpcap("./pcaps/"+file_name+".pcap")
            break
        except:
            time.sleep(0.01)

    nowread=len(packets)
    if nowread==readed:
        print("no inreased")
        return 
    for i in range(readed+1,nowread):
        p=packets[i]
        uses=str(p.mysummary).split(" ")
        # print(uses)    
        if "udp" not in str(p.mysummary) and "tcp" not in str(p.mysummary):
            continue
        if "load='udp'" not in str(p.mysummary) and "load='tcp'" not in str(p.mysummary):
            continue
        for use in uses:
            
            if "proto" in use:
                if "udp" in use:
                    udpcount+=1
                else: 
                    tcpcount+=1
            if "tos" in use:
                if "3" in use:
                    ecn_full=1
                    print("manle")
                else :
                    ecn_full=0
            # print(use)


    f=open("./record_file/"+file_name+".txt","w")
    print("udpcount:"+str(udpcount)+"  tcpcount"+str(tcpcount))
    if ecn_full==1:
        print("满啦")
    readed=nowread
    txt=str(nowread)+"\n"+str(udpcount)+"\n"+str(tcpcount)+"\n"+str(ecn_full)+"\n"

    f.write(txt)
    print("----------")
        