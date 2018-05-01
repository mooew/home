Value {
  control_ga: '1/0/3',
  status_ga: '1/0/4',
  conn:
   fsm {
     ipAddr: '192.168.2.247',
     ipPort: 3671,
     physAddr: '1.1.129',
     minimumDelay: 100,
     handlers:
      { connected: [Function: connected],
        event: [Function: event],
        error: [Function: error] },
     initialState: 'uninitialized',
     states:
      { uninitialized: [Object],
        connecting: [Object],
        connected: [Object],
        disconnecting: [Object],
        idle: [Object],
        requestingConnState: [Object],
        sendDatagram: [Object],
        sendTunnReq_waitACK: [Object],
        recvTunnReqIndication: [Object] },
     eventListeners:
      { '*': [],
        connected: [Array],
        event: [Array],
        error: [Array],
        'event_1/0/1': [Array],
        'event_1/3/1': [Array],
        'event_1/0/2': [Array],
        'event_1/3/2': [Array],
        'event_1/3/3': [Array],
        'event_1/2/1': [Array],
        'event_1/0/4': [Array],
        'event_1/3/4': [Array],
        'event_1/0/5': [Array],
        'event_1/3/5': [Array],
        'event_1/0/6': [Array],
        'event_1/3/6': [Array],
        'event_1/0/7': [Array],
        'event_1/3/7': [Array],
        'event_1/0/8': [Array],
        'event_1/3/8': [Array],
        'event_1/0/9': [Array],
        'event_1/3/9': [Array],
        'event_1/0/10': [Array],
        'event_1/3/10': [Array],
        'event_1/0/11': [Array],
        'event_1/3/11': [Array],
        'event_1/0/12': [Array],
        'event_1/3/12': [Array],
        'event_1/0/13': [Array],
        'event_1/3/13': [Array],
        'event_1/0/3': [Array],
        'event_1/1/3': [Array],
        'event_1/1/4': [Array] },
     useSafeEmit: false,
     hierarchy: {},
     pendingDelegations: {},
     options:
      { ipAddr: '192.168.2.247',
        ipPort: 3671,
        physAddr: '1.1.129',
        minimumDelay: 100,
        handlers: [Object],
        initialState: 'uninitialized',
        states: [Object] },
     log:
      LogDriver {
        format: [Function: format],
        levels: [Array],
        level: 'info',
        error: [Function],
        warn: [Function],
        info: [Function],
        debug: [Function],
        trace: [Function] },
     localAddress: '192.168.2.236',
     ThreeLevelGroupAddressing: true,
     sentTunnRequests: {},
     useTunneling: true,
     remoteEndpoint: { addrstring: '192.168.2.247', addr: [Object], port: 3671 },
     BindSocket: [Function],
     Connect: [Function],
     _stamped: true,
     inputQueue: [],
     targetReplayState: 'uninitialized',
     state: 'uninitialized',
     priorState: undefined,
     priorAction: '',
     currentAction: '',
     currentActionArgs: undefined,
     inExitHandler: false,
     socket:
      Socket {
        domain: null,
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        _handle: [Object],
        _receiving: false,
        _bindState: 1,
        type: 'udp4',
        fd: null,
        _reuseAddr: undefined,
        [Symbol(options symbol)]: {},
        [Symbol(asyncId)]: 7 } },
  control:
   Datapoint {
     domain: null,
     _events: {},
     _eventsCount: 0,
     _maxListeners: undefined,
     options: { ga: '1/0/3', dpt: 'DPT5.001' },
     dptid: 'DPT5.001',
     dpt:
      { basetype: [Object],
        subtypes: [Object],
        id: 'DPT5',
        fromBuffer: undefined,
        formatAPDU: undefined,
        subtypeid: '001',
        subtype: [Object] },
     current_value: null,
     conn:
      fsm {
        ipAddr: '192.168.2.247',
        ipPort: 3671,
        physAddr: '1.1.129',
        minimumDelay: 100,
        handlers: [Object],
        initialState: 'uninitialized',
        states: [Object],
        eventListeners: [Object],
        useSafeEmit: false,
        hierarchy: {},
        pendingDelegations: {},
        options: [Object],
        log: [Object],
        localAddress: '192.168.2.236',
        ThreeLevelGroupAddressing: true,
        sentTunnRequests: {},
        useTunneling: true,
        remoteEndpoint: [Object],
        BindSocket: [Function],
        Connect: [Function],
        _stamped: true,
        inputQueue: [],
        targetReplayState: 'uninitialized',
        state: 'uninitialized',
        priorState: undefined,
        priorAction: '',
        currentAction: '',
        currentActionArgs: undefined,
        inExitHandler: false,
        socket: [Object] } },
  status:
   Datapoint {
     domain: null,
     _events: {},
     _eventsCount: 0,
     _maxListeners: undefined,
     options: { ga: '1/0/4', dpt: 'DPT5.001' },
     dptid: 'DPT5.001',
     dpt:
      { basetype: [Object],
        subtypes: [Object],
        id: 'DPT5',
        fromBuffer: undefined,
        formatAPDU: undefined,
        subtypeid: '001',
        subtype: [Object] },
     current_value: null,
     conn:
      fsm {
        ipAddr: '192.168.2.247',
        ipPort: 3671,
        physAddr: '1.1.129',
        minimumDelay: 100,
        handlers: [Object],
        initialState: 'uninitialized',
        states: [Object],
        eventListeners: [Object],
        useSafeEmit: false,
        hierarchy: {},
        pendingDelegations: {},
        options: [Object],
        log: [Object],
        localAddress: '192.168.2.236',
        ThreeLevelGroupAddressing: true,
        sentTunnRequests: {},
        useTunneling: true,
        remoteEndpoint: [Object],
        BindSocket: [Function],
        Connect: [Function],
        _stamped: true,
        inputQueue: [],
        targetReplayState: 'uninitialized',
        state: 'uninitialized',
        priorState: undefined,
        priorAction: '',
        currentAction: '',
        currentActionArgs: undefined,
        inExitHandler: false,
        socket: [Object] } } }
index screen is 0
The screen "0" status is null
index sensor is 0
The "tempSensor1" status is nul
