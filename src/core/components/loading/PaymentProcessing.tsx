export function PaymentProcessing(){
    return(
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-sm mx-4">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-border" />
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">
              Processing Payment
            </h3>
            <p className="text-muted-foreground text-center text-sm">
              Please wait while we process your subscription...
            </p>
          </div>
        </div>
    )
}