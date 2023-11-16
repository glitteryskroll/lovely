from fastapi import HTTPException
from fastapi.responses import JSONResponse

class errors():
    def forbidden_resource(self):
        raise HTTPException(status_code=403, detail="Доступ запрещен")

    def not_found(self):
        raise HTTPException(status_code=404, detail="Ресурс не найден")

    def protected_resource(self):
        raise HTTPException(status_code=401, detail="Требуется аутентификация")

    def bad_request(self):
        raise HTTPException(status_code=400, detail="Неверный запрос")

    def success_response(self, message):
        response = JSONResponse(content=message, status_code=200)
        return response

    def internal_error(self):
        # Обработка внутренней ошибки
        raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

    def max_photos(self):
        # Обработка внутренней ошибки
        raise HTTPException(status_code=500, detail="limit photos")

    def max_videos(self):
        # Обработка внутренней ошибки
        raise HTTPException(status_code=500, detail="limit photos")

    def not_found(self):
        raise HTTPException(status_code=404, detail="Ресурс не найден")
