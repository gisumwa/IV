from django.shortcuts import render


def landing(request):
    """renders landing page for project"""
    return render(request, 'landing.html')
