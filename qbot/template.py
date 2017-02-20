
import sys
import getopt

class Program:
    """Base for programs"""
    def __init__(self, argv):
        def options = ["d", "device", "b", "baud", "q", "queue"]
        pass

    def parseoptions(self, options, argv):
        """Parse the command line. Options is a plist"""
        options = {}
        try:
            opts, args = getopt.getopt(argv, "d:b:q:", ["device=", "baud=", "queue="])
        except getopt.GetoptError:
            #  print "% -d /dev/serial0 -b 112512" sys.argv[0]
            sys.exit(2)
        for opt, arg in opts:
            if opt in ("-d", "--device"):
                options["device"] = arg
            elif opt in ("-b", "--baud"):
                options["baud"] = arg
            elif opt in ("-q", "--queue"):
                options["queue"] = arg
        return options
