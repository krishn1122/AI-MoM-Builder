from datetime import datetime
import pytz

class TimezoneHelper:
    """Timezone helper functions for IST conversion"""
    
    @staticmethod
    def get_current_ist_timestamp() -> str:
        """Get current timestamp in IST"""
        ist = pytz.timezone('Asia/Kolkata')
        now = datetime.now(ist)
        return now.isoformat()
    
    @staticmethod
    def convert_to_ist(date_obj: datetime) -> datetime:
        """Convert a datetime object to IST timezone"""
        ist = pytz.timezone('Asia/Kolkata')
        if date_obj.tzinfo is None:
            # If naive datetime, assume UTC
            utc = pytz.UTC
            date_obj = utc.localize(date_obj)
        return date_obj.astimezone(ist)
    
    @staticmethod
    def format_date_dd_mmm_yyyy(date_obj: datetime) -> str:
        """Format date as DD-MMM-YYYY"""
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        day = date_obj.day
        month = months[date_obj.month - 1]
        year = date_obj.year
        
        return f"{day:02d}-{month}-{year}"
    
    @staticmethod
    def format_time_hh_mm_ist(date_obj: datetime) -> str:
        """Format time as HH:MM IST"""
        ist_time = TimezoneHelper.convert_to_ist(date_obj)
        return f"{ist_time.hour:02d}:{ist_time.minute:02d} IST"
